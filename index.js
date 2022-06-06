/* grab url for index.html */
const baseUrlArray = window.location.href.split('/')
let baseUrl = ''
baseUrlArray.pop()
baseUrlArray.forEach((fragment,index) => {
	if (index === 0) { baseUrl += fragment }
	else { baseUrl += `/${fragment}` }
})

/* get window location href, strip baseUrl, and return */
const getUrl = () => {
	const url = window.location.href
	const currentPage = url.replace(`${baseUrl}/`,'')
	return currentPage || 'index.html'
}

/* return local path to js file */
const urlRouter = () => {
	let splitPage = getUrl().split('/')
	let localPath = ''
	if (splitPage.length > 1) {
		splitPage.forEach((fragment) => {
			localPath += `/${fragment}`
		})
	}
	else {
		localPath = `/${splitPage[0]}`
	}
	return localPath
}

/* make request for correct page view */
const renderPage = () => {
	const pageContent = require(`./js/${urlRouter()}`)
	console.log(pageContent)
}

/* run app when loaded */
const startApp = () => {
	window.addEventListener('load', () => {
		//window.history.pushState('','','./page/test.html')
		urlRouter()
	})
}

/* run */
startApp()