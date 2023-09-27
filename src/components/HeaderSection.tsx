import '../styles/HeaderSection.css'

type Props = {
  route: string
  title: string
  desc: string
}

const HeaderSection = (props: Props) => {
  return (
    <div>
      <p className='header-route'>{props.route}</p>
      <h1 className='header-title'>{props.title}</h1>
      <p className='header-desc'>{props.desc}</p>
    </div>
  )
}

export default HeaderSection