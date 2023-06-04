const mapFileExt = ext => {
  let f;

  switch (ext) {
    case "dcm":
      f = 8;
      break;

    case "doc":
    case "docx":
      f = 6;
      break;

    case "xlsx":
    case "xls":
    case "csv":
      f = 7;
      break;

    case "mp3":
      f = 5;
      break;

    case "mp4":
      f = 4;
      break;

    default:
      f = 9;
      break;
  }

  return f;
};

const mapFileExtension = (type, extension) => {
  let format;

  switch (type) {
    case "application/pdf":
      format = 1;
      break;

    case "text/calendar":
    case "text/html":
    case "text/plain":
    case "text/xml":
    case "text/css":
    case "text/javascript":
      format = 2;
      break;

    case "image/gif":
    case "image/png":
    case "image/tiff":
    case "image/jpeg":
    case "image/svg+xml":
    case "image/bmp":
    case "image/webp":
    case "image/x-icon":
      format = 3;
      break;

    case "video/x-msvideo":
    case "video/mpeg":
    case "video/ogg":
    case "video/mp2t":
    case "video/webm":
    case "video/3gpp":
    case "video/3gpp2":
      format = 4;
      break;

    case "audio/aac":
    case "audio/midi":
    case "audio/x-midi":
    case "audio/mpeg":
    case "audio/ogg":
    case "audio/opus":
    case "audio/x-wav":
    case "audio/wav":
    case "audio/webm":
    case "audio/3gpp":
    case "audio/3gpp2":
      format = 5;
      break;

    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      format = 6;
      break;

    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel":
    case "text/csv":
      format = 7;
      break;

    case "":
      format = mapFileExt(extension);
      break;

    default:
      format = 9;
      break;
  }

  return format;
};

export { mapFileExtension };