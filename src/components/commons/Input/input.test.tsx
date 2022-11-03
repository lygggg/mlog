import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "src/styles/globalStyle";
import Input, { InputStyled } from "./Input";

describe("Input", () => {
  const onChange = jest.fn();
  const renderInput = ({
    placeholder,
    variant,
    rounded,
    fontSize,
  }: InputStyled) =>
    render(
      <ThemeProvider theme={theme}>
        <Input
          variant={variant}
          rounded={rounded}
          fontSize={fontSize}
          onChange={onChange}
          placeholder={placeholder}
        />
        ,
      </ThemeProvider>,
    );

  const placeholder = "placeholder";
  it("넘겨준 placeholder가 input placeholder에 반영된다.", () => {
    renderInput({
      placeholder: placeholder,
      variant: "default",
      rounded: "default",
      fontSize: "mini",
    });

    screen.getByPlaceholderText(placeholder);

    expect(screen.queryByPlaceholderText(placeholder)).not.toBeNull();
  });

  it("input에 입력하면 onChange 호출된다. ", () => {
    const { getByPlaceholderText } = renderInput({
      placeholder: placeholder,
      variant: "default",
      rounded: "default",
      fontSize: "mini",
    });

    const input = getByPlaceholderText(placeholder);
    const value = "입력값";
    fireEvent.change(input, { target: { value } });
    expect(onChange).toBeCalled();
  });

  describe("스타일", () => {
    const styleMock = [
      {
        variant: "primary",
        fontSize: "small",
        rounded: "round",
        backgroundColor: `${theme.gray[500]}`,
        color: `${theme.white}`,
        fontScale: "1.3rem",
        borderRadius: "2rem",
      },
      {
        variant: "secondary",
        fontSize: "medium",
        rounded: "round",
        backgroundColor: `${theme.black[500]}`,
        color: `${theme.white}`,
        fontScale: "2rem",
        borderRadius: "2rem",
      },
      {
        variant: "tertiary",
        fontSize: "mini",
        rounded: "round",
        backgroundColor: `${theme.purple[500]}`,
        color: `${theme.white}`,
        fontScale: "0.5rem",
        borderRadius: "2rem",
      },
      {
        variant: "default",
        fontSize: "large",
        rounded: "default",
        backgroundColor: "transparent",
        color: `${theme.white}`,
        fontScale: "2.5rem",
        borderRadius: "0.3rem",
      },
    ];

    // TODO 빨간줄??
    styleMock.forEach((style) => {
      it(`variant, rounded, fontSize를 테스트한다.`, () => {
        const { getByPlaceholderText } = renderInput({
          placeholder: placeholder,
          variant: style.variant,
          rounded: style.rounded,
          fontSize: style.fontSize,
        });
        const input = getByPlaceholderText(placeholder);

        expect(input).toHaveStyle(`background-color: ${style.backgroundColor}`);
        expect(input).toHaveStyle(`font-size:  ${style.fontScale}`);
        expect(input).toHaveStyle(`border-radius: ${style.borderRadius}`);
        expect(input).toHaveStyle(`color: ${style.color}`);
      });
    });
  });
});