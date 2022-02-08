import { format } from 'date-fns';
import getResource from './get-resource';
import cropText from '../../utils/crop-text';
import BASE_URL from './base-url';

const getArticle = async (segment) => {
  const url = `${BASE_URL}/articles/${segment}`;

  try {
    const response = await getResource(url);
    const { article } = response;
    const { author, body, createdAt, description, favorited, favoritesCount, tagList, title } = article;

    return {
      author: {
        image: author.image,
        username: author.username,
      },
      body,
      createdAt: format(new Date(createdAt), 'MMMM d, yyyy'),
      description: cropText(description, 170),
      favorited,
      favoritesCount,
      tagList,
      title,
    };
  } catch {
    throw new Error();
  }
};

export default getArticle;
