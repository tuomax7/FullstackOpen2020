const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {return sum + item.likes}

	return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

	if(blogs.length === 0) return null

	const reducer = (favorite, challenger) => {
		if(favorite.likes > challenger.likes) return favorite
		else return challenger
	}

	return blogs.reduce(reducer, blogs[0])

}

/*

const mostBlogs = (blogs) => {
	if(blogs.length === 0) return null

	let bloggers = []

	const handleBlog = (blog) => {
		if(bloggers.hasOwnProperty(blog.author)){
			bloggers[blog.author]++
		}else{
			bloggers[blog.author] = 1
		}
	}

	blogs.forEach(blog => handleBlog(blog))


	const reducer = (topBlogger, challenger) => {
		if(bloggers[topBlogger] > bloggers[challenger]) return topBlogger
		else return challenger
	}

	const topBloggerName = bloggers.reduce(reducer, bloggers[0])

	return {author: topBloggerName, blogs: bloggers[topBloggerName]}

}

*/

module.exports = {
	dummy, totalLikes, favoriteBlog
}