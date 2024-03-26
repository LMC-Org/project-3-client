import { useEffect, useState } from "react";
import HelpPostHome from "../../components/HelpPostHome/HelpPostHome";
import "./HomePage.css";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import Loading from "../../components/Loading/Loading";


function HomePage() {
	const [helpPostsArr, setHelpPostsArr] = useState([]);
	const { user } = useContext(AuthContext);

	const handleSearch = (searchValue) => {
		helpPostsArr.filter((eachHelpPost) => {

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
				<><div className="home-head">
					<p className="home-title" style={{ fontFamily: 'NY', fontStyle: 'italic', fontWeight: 'lighter' }}>HOW CAN YOU HELP TODAY ?</p>
					<p className="home-subtitle">Browse among all posts, filter by any word.</p>
					<br />
					<div className="search-bar">
						<input onChange={(event) => handleSearch(event.target.value)} type="text" name="search-input" id="search-input" placeholder="English classes intermediate" />
						<span>{''}    {''}<i className="fa fa-search"></i></span>
					</div>
				</div><div className="home-page-container">

						<div id="home-content-wrapper">

							{helpPostsArr && helpPostsArr.map((eachPost, index) => {

								return (
									<div key={index} className="posts-container">

										<HelpPostHome post={eachPost} />
									</div>
								);
							})}
						</div>
					</div>
				</>
				: <Loading />}
		</>
	);
}

export default HomePage;
