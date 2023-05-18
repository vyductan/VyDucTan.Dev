import { type ResumeData } from '../resumeData'

type ResumeProps = {
  data: ResumeData['resume']
}
const Resume = ({ data }: ResumeProps) => {
  if (!data) return <></>
  const skillmessage = data.skillmessage
  const education = data.education.map(function (education) {
    return (
      <div key={education.school}>
        <h2>{education.school}</h2>
        <p className='info'>
          {education.degree}
          <span> &bull; </span>
          <em className='date'>{education.graduated}</em>
        </p>
        <p className='desc'>{education.description}</p>
      </div>
    )
  })
  const certification = data.certification.map(function (x) {
    return (
      <div key={x.name}>
        <h2>{x.name}</h2>
        <p className='info'>
          {x.provider} <span> &bull; </span>{' '}
          <em className='date'>{x.graduated}</em>
        </p>
      </div>
    )
  })
  const work = data.work.map(function (work) {
    return (
      <div key={work.company}>
        <h2>{work.company}</h2>
        <p className='info'>
          {work.title}
          <span> &bull; </span> <em className='date'>{work.years}</em>
        </p>
        <p className='desc'>{work.description}</p>
      </div>
    )
  })
  const skills = data.skills.map(function (skills) {
    const className = 'bar-expand ' + skills.name.toLowerCase()
    return (
      <li key={skills.name}>
        <em>{skills.name}</em>
        <div className='bar-container'>
          <span
            style={{ width: skills.level }}
            className={className}
          ></span>
        </div>
      </li>
    )
  })

  return (
    <section
      id='resume'
      className='divide-y'
    >
      <div className='resume-row'>
        <h1>
          <span>Education</span>
        </h1>

        <div className='resume-detail'>{education}</div>
      </div>

      <div className='resume-row'>
        <h1>
          <span>Certification</span>
        </h1>

        <div className='resume-detail'>{certification}</div>
      </div>

      <div className='resume-row'>
        <h1>
          <span>Work</span>
        </h1>

        <div className='resume-detail'>{work}</div>
      </div>

      <div className='resume-row'>
        <h1>
          <span>Skills</span>
        </h1>

        <div className='resume-detail'>
          <p className='desc'>{skillmessage}</p>

          <div className='bars'>
            <ul className='space-y-5'>{skills}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume
