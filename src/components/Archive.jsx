import { useState } from 'react'
import { createRandomPost } from '../helpers/createRandomPost'
import { usePosts } from '../hooks/usePost'

function Archive() {
	const [posts] = useState(() => Array.from({ length: 100 }, () => createRandomPost()))
	const [showArchive, setShowArchive] = useState(false)

	const { onAddPost } = usePosts()

	return (
		<aside>
			<h2>Post archive</h2>
			<button onClick={() => setShowArchive((s) => !s)}>
				{showArchive ? 'Hide archive posts' : 'Show archive posts'}
			</button>

			{showArchive && (
				<ul>
					{posts.map((post, i) => (
						<li key={i}>
							<p>
								<strong>{post.title}:</strong> {post.body}
							</p>
							<button onClick={() => onAddPost(post)}>Add as new post</button>
						</li>
					))}
				</ul>
			)}
		</aside>
	)
}

export default Archive