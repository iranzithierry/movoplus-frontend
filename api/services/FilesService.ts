/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from '../models/File';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FilesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    
    public filesCreate(
        formData: File,
    ): CancelablePromise<File> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/files/',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

}
