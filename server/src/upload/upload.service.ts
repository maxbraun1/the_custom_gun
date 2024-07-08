import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  private endpoint = 'https://s3.us-east-005.backblazeb2.com';
  private readonly s3 = new S3Client({
    endpoint: this.endpoint,
    region: 'us-east-005',
  });

  async upload(file: Express.Multer.File, bucket: string) {
    const uniqueFileName = uuid() + '.' + file.originalname.split('.').pop();

    try {
      const response = await this.s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: uniqueFileName,
          Body: file.buffer,
        }),
      );

      const url = this.endpoint + '/' + bucket + '/' + uniqueFileName;
      return url;
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException();
    }
  }

  async deleteUnlinkedImages() {
    console.log('Deleting unlinked images');
    const unlinkedImages = await this.prisma.listing_images.findMany({
      where: { listing_id: null },
    });

    const expiredUnlinkedImages = unlinkedImages.filter(
      (image) =>
        Date.now() - new Date(image.uploaded_date).getTime() >
        5 * 60 * 60 * 1000,
    );

    expiredUnlinkedImages.map(async (unlinkedImage) => {
      const imageKey = unlinkedImage.url.split('/').pop();
      console.log(imageKey);

      const versionID = await this.s3
        .send(
          new GetObjectCommand({
            Bucket: 'the-custom-gun',
            Key: imageKey,
          }),
        )
        .then((response) => {
          return response.VersionId;
        })
        .catch((err) => {
          return null;
        });

      if (versionID) {
        console.log(
          'Deleting file ' + imageKey + ' with versionID ' + versionID,
        );
        await this.s3
          .send(
            new DeleteObjectCommand({
              Bucket: 'the-custom-gun',
              Key: imageKey,
              VersionId: versionID,
            }),
          )
          .then(async () => {
            // Image deleted, now delete database record
            await this.prisma.listing_images.delete({
              where: { id: unlinkedImage.id },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log('Image (' + imageKey + ') not found');
      }
    });
  }
}
