import { createContext, useMemo, useState } from 'react'
import { createRandomPost } from '../helpers/createRandomPost'

const PostContext = createContext();

function PostProvider({ children }) {
	const [posts, setPosts] = useState(() => Array.from({ length: 30 }, () => createRandomPost()))
	const [searchQuery, setSearchQuery] = useState('')

	const searchedPosts =
		searchQuery.length > 0
			? posts.filter((post) =>
				`${post.title} ${post.body}`
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
			)
			: posts

	function handleAddPost(post) {
		setPosts((posts) => [post, ...posts])
	}

	function handleClearPosts() {
		setPosts([])
	}

	const value = useMemo(() => {
		return {
			posts: searchedPosts,
			onAddPost: handleAddPost,
			onClearPosts: handleClearPosts,
			searchQuery,
			setSearchQuery,
		}
	}, [searchedPosts, searchQuery])

	return (
		<PostContext.Provider value={value}>
			{children}
		</PostContext.Provider>
	)
}

export { PostProvider, PostContext }


