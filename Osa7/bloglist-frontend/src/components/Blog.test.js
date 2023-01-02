import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const userObj = {
  username: "Tomppa",
  name: "Tuomas Nummela",
};

describe("<Blog /> ", () => {
  const mockLike = jest.fn();
  const mockRemove = jest.fn();

  const blog = {
    title: "Testikomponentti",
    author: "Testikirjoittaja",
    url: "/testiurl",
    likes: 5,
    user: userObj,
  };

  let container;

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        likeBlog={mockLike}
        removeBlog={mockRemove}
        user={userObj}
      />
    ).container;
  });
  test("renders title of blog", () => {
    const element = screen.getByText("Testikomponentti by Testikirjoittaja");

    expect(element).toBeDefined();
  });
  test("renders details of blog when view-pressed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("Show");
    await user.click(button);

    const div = container.querySelector(".blogDetails");
    expect(div).not.toHaveStyle("display: none");
  });
  test("likeBlog is called twice when Like is pressed", async () => {
    const user = userEvent.setup();
    const showButton = screen.getByText("Show");
    await user.click(showButton);

    const likeButton = screen.getByText("Like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockLike.mock.calls).toHaveLength(2);
  });
});
