import NavSideBar from './NavSideBar'


function Home() {
  return (
    <>
      <div className='flex'>
        <main>
          <section className='HomeSection1'>
            <aside className='textContainer1'>
              <div className='tagLine'>
                <h3>Let&apos;s</h3>
                <h2>Dive into the</h2>
                <h1>Fitness Pool</h1>
              </div>
              <p>
              Transform your fitness journey with Fit Pool! Explore a wide range of exercises, expert workout guides. Whether you aim to build strength, improve endurance, or stay active, we provide the right tools and motivation to keep you on track.Let&apos;s get every muscle in shape!
              </p>
            </aside>
            <aside className='imageContainer1'>

            </aside>
          </section>
        </main>
        <div>
          <NavSideBar />
        </div>
      </div>
    </>
  )
}

export default Home