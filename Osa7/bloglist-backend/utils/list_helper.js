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



const mostBlogs = (blogs) => {
	if(blogs.length === 0) return null

	const result = blogs.reduce((bloggers, blog) => {

		let knownBlogger = bloggers.find(foundBlogger => {
			return foundBlogger.author === blog.author
		})


		if(!knownBlogger){
			return bloggers.concat({ author: blog.author, blogs: 1 })
		}

		knownBlogger.blogs++
		return bloggers
	}, [])

	return result.reduce((topBlogger, blogger) => (topBlogger.blogs > blogger.blogs ? topBlogger : blogger))
}

const mostLikes = (blogs) => {

	if(blogs.length === 0) return null

	const result = blogs.reduce((bloggers, blog) => {

		let knownBlogger = bloggers.find(foundBlogger => {
			return foundBlogger.author === blog.author
		})


		if(!knownBlogger){
			return bloggers.concat({ author: blog.author, likes: blog.likes })
		}

		knownBlogger.likes += blog.likes
		return bloggers
	}, [])

	return result.reduce((topLikedBlogger, blogger) => (topLikedBlogger.likes > blogger.likes ? topLikedBlogger : blogger))
}


module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}