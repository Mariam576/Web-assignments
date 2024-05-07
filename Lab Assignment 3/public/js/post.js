

function getThumbnailUrl(thumbnailUrl) {
       
    const defaultImageUrl = '/path/to/default-image.jpg';

   
    if (thumbnailUrl && typeof thumbnailUrl === 'string' && thumbnailUrl.trim() !== '') {
        
        return thumbnailUrl;
    } else {
      
        return defaultImageUrl;
    }
}