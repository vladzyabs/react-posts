import React           from 'react';
import { useMutation } from '@apollo/client';
import { useHistory }  from 'react-router-dom';

import PATHS          from '../../paths';
import { formatDate } from '../../utils';
import { graphql }    from '../../graphql';

import { Button } from '../@ui';

function Commentaries({postId, comments, commentCount, currentUserId}) {
  const history                           = useHistory();
  const [errors, setErrors]               = React.useState('');
  const [value, setValue]                 = React.useState('');
  const [commentsState, setCommentsState] = React.useState([]);

  const [createComment, {loading}] = useMutation(graphql.CREATE_COMMENT_MUTATION);

  const handleChange = (event) => {
    setValue(event.currentTarget.value);
  };

  const handleSend = async () => {
    await createComment({
      variables: {
        body: value,
        postId,
      },
      update() {
        setValue('');
      },
    }).then(
      res => {
        const comments = res?.data?.createComment?.comments;
        if (comments) setCommentsState(comments);
      },
      err => {
        setErrors(err?.message || 'Something went wrong, try again');
      },
    );
  };

  React.useEffect(() => {
    if (comments) {
      setCommentsState(comments);
    }
  }, [comments]);

  return (
    <div>
      {currentUserId && (
        <div>
          {errors && (
            <p>{errors}</p>
          )}
          <textarea value={value} onChange={handleChange} />
          <Button onClick={handleSend} disabled={loading}>Send</Button>
        </div>
      )}

      {commentsState.length > 0 ? (
        <>
          <span>💬{' '}{commentCount}</span>
          {commentsState.map(comment => {
            return (
              <div key={comment.id} style={{borderBottom: '1px solid #dadada'}}>
                <span>{comment.username}</span>
                <span>{formatDate(comment.createdAt)}</span>
                <p>{comment.body}</p>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <h4>There are no comments yet. Be the first!</h4>
          {!currentUserId && (
            <Button
              onClick={() => history.push(PATHS.LOGIN)}
            >Login</Button>
          )}
        </>
      )}
    </div>
  );
}

export default Commentaries;