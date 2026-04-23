import dayjs from "dayjs";
export const transformDate = (value: string, format: string) => {
  return dayjs(value).format(format);
};

export const uploadFileToS3 = async (
  preSignedUrl: string,
  file: File,
  loader: {
    start?: () => void;
    end?: () => void;
  }
): Promise<{
  success: boolean;
  status: number;
  error?: string;
}> => {
  try {
    loader?.start?.()
    const response = await fetch(preSignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (response.status === 200) {
      return {
        success: true,
        status: 200,
      };
    } else {
      return {
        success: false,
        status: response.status,
        error: "Upload failed",
      };
    }
  } catch (error: any) {
   
    return {
      success: false,
      status: 500,
      error: error?.message || "Something went wrong",
    };
  }finally{
     loader?.end?.()
  }
};
