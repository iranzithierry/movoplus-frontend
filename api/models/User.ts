/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type User = {
    readonly id: string;
    name?: string;
    email?: string;
    profile_picture?: ProfilePicture;
};


export interface ProfilePicture {
    original:           string;
    thumbnail:          string;
    medium_square_crop: string;
    small_square_crop:  string;
}
