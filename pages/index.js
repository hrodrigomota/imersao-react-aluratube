import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";

function HomePage() {
  const service = videoService();
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlayLists] = React.useState({});
  // const playlists = {
  //   "jogos": [],
  // }

  React.useEffect(() => {
    service.getAllVideos().then((dados) => {
      console.log(dados.data);
      const novasPlaylists = { ...playlists };
      dados.data.forEach((video) => {
        if (!novasPlaylists[video.playlist])
          novasPlaylists[video.playlist] = [];
        novasPlaylists[video.playlist].push(video);
      });
      setPlayLists(novasPlaylists);
    });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          // backgroundColor: "red"
        }}
      >
        {/* Prop Drilling */}
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        {/* <Timeline searchValue={valorDoFiltro} playlists={config.playlists}> */}
        <Timeline searchValue={valorDoFiltro} playlists={playlists}>
          Conteúdo
        </Timeline>
      </div>
    </>
  );
}

export default HomePage;

// function Menu() {
//   return (
//     <>
//       <div>Menu</div>
//     </>
//   );
// }

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  background-color: blue;
  background-image: url(${({ bg }) => bg});
  /* background-image: url(${config.bg}); */
  /* background-image: url("https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"); */
  height: 230px;
`;
function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img
          src={`https://github.com/${config.github}.png`}
          alt="Foto de Perfil"
        />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function Timeline({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);

  return (
    <>
      <StyledTimeline>
        {playlistNames.map((playlistName) => {
          const videos = props.playlists[playlistName];
          return (
            <section key={playlistName}>
              <h2>{playlistName}</h2>
              <div>
                {videos
                  .filter((video) => {
                    const titleNormalized = video.title.toLowerCase();
                    const searchValueNormalized = searchValue.toLowerCase();
                    return titleNormalized.includes(searchValueNormalized);
                  })
                  .map((video) => {
                    return (
                      <a key={video.url} href={video.url}>
                        <img src={video.thumb} />
                        <span>{video.title}</span>
                      </a>
                    );
                  })}
              </div>
            </section>
          );
        })}
      </StyledTimeline>
    </>
  );
}
