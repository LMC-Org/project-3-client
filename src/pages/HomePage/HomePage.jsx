import { useEffect, useState } from "react";
import HelpPostHome from "../../components/HelpPostHome/HelpPostHome";
import "./HomePage.css";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import service from '../../services/file-upload.service'
import Loading from "../../components/Loading/Loading";


function HomePage() {
	const [helpPostsArr, setHelpPostsArr] = useState([]);
	const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

	const handleSearch = (searchValue) => {
		const helpPostsUpdated = helpPostsArr.filter((eachHelpPost) => {
			
			return eachHelpPost.title.includes(searchValue)
		})
		if (searchValue === "") {
			const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
			fetch(`${BACKEND_ROOT}/api/home`)
				.then((res) => res.json())
				.then((resJson) => { setHelpPostsArr(resJson); })
				.catch((err) => console.log(err));
		} else {
			const helpPostsUpdated = helpPostsArr.filter((eachHelpPost) =>
				eachHelpPost.title.toLowerCase().includes(searchValue.toLowerCase())
			);

			setHelpPostsArr(helpPostsUpdated);
		}
	}

	useEffect(() => {
		const BACKEND_ROOT = import.meta.env.VITE_SERVER_URL;
		fetch(`${BACKEND_ROOT}/api/home`)
			.then((res) => res.json())
			.then((resJson) => { setHelpPostsArr(resJson); })
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
		{helpPostsArr && user ? 
		<div className="home-page-container">

			<div id="home-content-wrapper">

				<div className="home-head">
					<p className="home-title">HOW CAN YOU HELP TODAY?</p>
					<br />
					<div className="search-bar">
						<input onChange={(event) => handleSearch(event.target.value)} type="text" name="search-input" id="search-input" />
						<span>{''}    {''}<i className="fa fa-search"></i></span>
					</div>
				</div>
				{
					helpPostsArr && helpPostsArr.map((eachPost, index) => {
						
						return (
							<div key={index} className="posts-container">

								<HelpPostHome  post={eachPost} />
							</div>
						);
					})
				}
			</div>
		</div>
		: <Loading/>}
		</>
	);
}

export default HomePage;
