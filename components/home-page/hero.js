import Image from 'next/image'

import classes from './hero.module.css'

function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src='/images/site/billy-p.png' alt='Billy Bee' width={300} height={300} />
            </div>
            <h1>Hello, it's Billy</h1>
            <p>This is a blog about Babylon JS and Three JS</p>
        </section>
    )
}

export default Hero