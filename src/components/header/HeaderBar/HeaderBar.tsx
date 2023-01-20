import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button, IconButton } from "src/components/commons";
import { LoginModal } from "src/components/login/LoginModal";
import useModal from "src/hooks/useModal";
import { MenuDropdown } from "../index";

const HeaderBar = () => {
  const { data: session } = useSession();
  const [openModal, closeModal, modalOpen] = useModal();

  const handleModalOpen = () => openModal();
  return (
    <>
      <LoginModal isActive={modalOpen} handleClose={closeModal} />
      <HeaderContainer>
        <HeaderLayout>
          <HeaderLeftContainer>
            <Title>
              <h1>
                <StyledLink href={"/"}>MLOG</StyledLink>
              </h1>
            </Title>
          </HeaderLeftContainer>
          <HeaderRightContainer>
            <Link href={"/articles"}>Posts</Link>

            <IconButton
              width="30px"
              height="30px"
              position="-110px -10px"
              aria-label="검색하기"
            />
            {/* <IconButton
              width="30px"
              height="30px"
              position="-10px -10px"
              aria-label="다크모드로 변환하기"
            /> */}
            {session ? (
              <MenuDropdown />
            ) : (
              <Button
                variant="primary"
                size="medium"
                rounded={true}
                onClick={handleModalOpen}
                data-testid="login-button"
              >
                로그인
              </Button>
            )}
          </HeaderRightContainer>
        </HeaderLayout>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.header`
  background-color: rgba(100, 100, 100, 0.5);
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 65px;
  z-index: 100;
  position: sticky;
  backdrop-filter: blur(30px);
`;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  width: 1200px;
`;
const HeaderRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const HeaderLeftContainer = styled.div`
  display: flex;
  gap: 20px;
  cursor: pointer;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 800;
  font-size: 1.8rem;
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.green[700]};
`;

export default HeaderBar;
