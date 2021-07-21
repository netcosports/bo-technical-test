const getYoutubeEmbedUrl = (url) => {
  const splittedUrl = url.split('=');
  return `https://www.youtube.com/embed/${splittedUrl[splittedUrl.length - 1]}`;
};

export default getYoutubeEmbedUrl;
