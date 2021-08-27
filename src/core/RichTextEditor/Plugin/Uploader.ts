import type { CKEditorPluginType } from '../type';

interface Options {
    uploadURL: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    formDataFields: Record<string, (file: File) => any>;
    imageSizeLimitKB?: number;
}

interface CustomUploadAdapterOptions extends Options {
    // Ref: https://github.com/ckeditor/ckeditor5/blob/0540db763c70cc0bf98201b7cb8983d2ef26561d/packages/ckeditor5-upload/src/filerepository.js#L379
    loader: { file: Promise<File | null> };
}

class CustomUploadAdapter {
    private httpRequest?: XMLHttpRequest;

    constructor(private readonly options: CustomUploadAdapterOptions) {}

    abort = () => {
        this.httpRequest?.abort();
    };

    upload = async (): Promise<{
        default: string;
        [responsiveSize: string]: string;
    }> => {
        const { loader, imageSizeLimitKB, uploadURL, formDataFields, method } = this.options;
        this.httpRequest = new XMLHttpRequest();
        const httpRequest = this.httpRequest;
        const formData = new FormData();
        const file = await loader.file;

        return new Promise((resolve, reject) => {
            const onFailure = (errorMessage: string) => {
                reject(errorMessage);
            };

            const onLoad = () => {
                const { status } = httpRequest;
                try {
                    if (status !== 200) {
                        onFailure(`無法上載圖片 - HTTP ${status}`);
                        return;
                    }
                    const imageURL = '';
                    // const {imageURL} = UploadUtil.castImageUploadResponse(response);
                    resolve({ default: imageURL });
                } catch (e) {
                    let errorMessage = '[Unknown]';
                    if (e instanceof Error) {
                        errorMessage = e.message;
                    }
                    onFailure(errorMessage);
                }
            };

            if (file === null) {
                onFailure(`CKEditor FileLoader 壞了`); // https://github.com/ckeditor/ckeditor5/blob/0540db763c70cc0bf98201b7cb8983d2ef26561d/packages/ckeditor5-upload/src/filerepository.js#L392-L393
                return;
            }

            if (imageSizeLimitKB !== undefined && file.size > imageSizeLimitKB * 1024) {
                onFailure(`圖片不能大於 ${imageSizeLimitKB} KB`);
                return;
            }

            httpRequest.addEventListener('error', () => onFailure('上載失敗'), false);
            httpRequest.addEventListener('abort', () => onFailure('中止上載'), false);
            httpRequest.addEventListener('timeout', () => onFailure('連線逾時'), false);
            httpRequest.addEventListener('load', onLoad, false);
            Object.entries(formDataFields).forEach(([key, callback]) => {
                const value = callback(file);
                formData.append(key, value);
            });
            httpRequest.open(method, uploadURL, true);
            httpRequest.send(formData);
        });
    };
}

export function Uploader(options: Options): CKEditorPluginType {
    return (editor) => {
        const fileRepository: any = editor.plugins.get('FileRepository');
        fileRepository.createUploadAdapter = (loader: any) => new CustomUploadAdapter({ ...options, loader });
    };
}
