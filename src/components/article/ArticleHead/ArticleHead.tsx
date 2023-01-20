import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { Button, Chip } from "src/components/commons";
import { useDeleteArticle } from "src/hooks/api/useArticle";
import { articleState } from "src/store/article";
import { Article } from "src/models/article";

export interface Props {
  article: Article;
}
const ArticleHead: React.FC<Props> = ({ article }) => {
  const {
    query: { userId, id },
    push,
  } = useRouter();
  const { data: session } = useSession();
  const {
    title,
    tags,
    thumbnailUrl,
    syncTime,
    _id,
    email,
    content,
    introduction,
  } = article;

  const setArticle = useSetRecoilState(articleState);
  const deleteArticleMutation = useDeleteArticle();

  const handleModifyArticle = () => {
    setArticle({
      content,
      tags,
      title,
      thumbnailUrl,
      introduction,
      syncTime,
      _id,
    });
  };

  const handleRemoveArticle = async () => {
    try {
      await deleteArticleMutation.mutateAsync(id);
      await push(`/${userId}`);
    } catch (err) {
      await alert("삭제 실패");
    }
  };

  return (
    <Container>
      <Title data-testid="article-head">{title}</Title>
      {session?.isAdmin && (
        <EndContainer>
          <Link href={{ pathname: "/write", query: { id: _id } }}>
            <Button
              variant="primary"
              size="mini"
              data-testid="article-modify"
              aria-label="블로그 글 수정하기"
              onClick={handleModifyArticle}
            >
              수정
            </Button>
          </Link>
          <Button
            variant="primary"
            size="mini"
            data-testid="article-delete"
            aria-label="블로그 글 삭제하기"
            onClick={handleRemoveArticle}
          >
            삭제
          </Button>
        </EndContainer>
      )}
      {syncTime}
      <TagContainer>
        {tags.map((tag: string) => (
          <Chip size="small" key={tag} data-testid="article-head-tag">
            {tag}
          </Chip>
        ))}
      </TagContainer>
      {thumbnailUrl && (
        <ImageContainer>
          <Image src={thumbnailUrl} fill alt={title} />{" "}
        </ImageContainer>
      )}
    </Container>
  );
};

export default ArticleHead;

const Container = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const TagContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

const EndContainer = styled.div`
  display: flex;
  gap: 10px;
  align-self: end;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 800;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
