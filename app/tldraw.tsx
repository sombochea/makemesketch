'use client'

import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
// import { MakeRealButton } from './components/MakeRealButton'
// import { TldrawLogo } from './components/TldrawLogo'
// import { ResponseShapeUtil } from './ResponseShape/ResponseShape'
import { useYjsStore } from './hooks/useYjsStore'
import { track, useEditor } from '@tldraw/tldraw'
import { YJS_WEBSOCKET_URL } from './lib/app.config'
// import { RiskyButCoolAPIKeyInput } from './components/RiskyButCoolAPIKeyInput'

const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
})

// const shapeUtils = [ResponseShapeUtil]

export default function TldrawApp() {
	const store = useYjsStore({
		roomId: 'demo',
		hostUrl: YJS_WEBSOCKET_URL,
	})

	return (
		<div className="editor">
			<Tldraw
				store={store}
				// persistenceKey="make-me-sketch"
				// shareZone={<MakeRealButton />}
				shareZone={<NameEditor />}
				// shapeUtils={shapeUtils}
				autoFocus
			>
				{/* <TldrawLogo /> */}
				{/* <RiskyButCoolAPIKeyInput /> */}
			</Tldraw>
		</div>
	)
}

const NameEditor = track(() => {
	const editor = useEditor()

	const { color, name } = editor.user

	return (
		<div style={{ pointerEvents: 'all', display: 'flex' }}>
			<input
				type="color"
				value={color}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						color: e.currentTarget.value,
					})
				}}
			/>
			<input
				value={name}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						name: e.currentTarget.value,
					})
				}}
			/>
		</div>
	)
})
