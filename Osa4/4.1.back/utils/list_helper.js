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

	const result = blogs.reduce((bloggers, blogger) => {

		let knownBlogger = bloggers.find(foundBlogger => {
			return foundBlogger.author === blogger.author
		})


		if(!knownBlogger){
			return bloggers.concat({ author: blogger.author, blogs: 1 })
		}

		knownBlogger.blogs++
		return bloggers
	}, [])

	return result.reduce((topBlogger, blogger) => (topBlogger.blogs > blogger.blogs ? topBlogger : blogger))
}


module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs
}