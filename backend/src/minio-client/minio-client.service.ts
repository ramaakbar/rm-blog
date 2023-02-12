import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class MinioClientService {
  constructor(
    private readonly minio: MinioService,
    private configService: ConfigService,
  ) {}
  private readonly bucketName = this.configService.get('BUCKET_NAME');

  public get client() {
    return this.minio.client;
  }

  public async upload(thumbnail: Express.Multer.File) {
    const picExt = thumbnail?.originalname.split('.')[1];
    const newPicName = `${randomUUID()}.${picExt}`;
    const picUrl = `https://minio.ramaakbar.xyz/${this.bucketName}/${newPicName}`;
    const metaData = { 'Content-Type': thumbnail.mimetype };

    this.client.putObject(
      this.bucketName,
      newPicName,
      thumbnail.buffer,
      thumbnail.size,
      metaData,
      (err) => {
        if (err) {
          throw new BadRequestException(
            'Error occured on uploading image, please try again +' + err,
          );
        }
      },
    );
    return picUrl;
  }

  public async delete(objName: string) {
    this.client.removeObject(this.bucketName, objName, (err) => {
      if (err) {
        throw new BadRequestException(
          'Error occured on deleting image, please try again +' + err,
        );
      }
    });
  }
}
