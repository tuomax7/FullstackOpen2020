const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {return sum + item.likes}

	return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

	if(blogs.length === 0) return null
	let favorite = blogs[0]

	const challengeFavorite = (blog1, blog2) => {
		if(blog1.likes > blog2.likes) favorite = blog1
		else favorite = blog2
	}

	blogs.forEach(blog => challengeFavorite(favorite, blog))

	return favorite
}

module.exports = {
	dummy, totalLikes, favoriteBlog
}