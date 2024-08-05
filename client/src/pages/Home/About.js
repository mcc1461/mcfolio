import about from "../../assets/About_MusCo.png";
import SectionTitle from "../../components/SectionTitle";

const About = () => {
  const skills = [
    "JavaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
  ];
  return (
    <>
      <SectionTitle title="About" />
      <div className="section-A">
        <div className="flex flex-col items-center justify-center h-full overflow-auto bg-mc-blue lg:flex-row xl:flex-row xl2:flex-row">
          <div className="flex items-center justify-center w-full p-3 lg:w-1/2">
            <img
              src={about}
              alt="About MusCo"
              className="w-full h-auto max-w-[500px] rounded-lg bg-quaternary-100"
            />
          </div>
          <div className="w-full p-3 overflow-y-auto lg:w-1/2">
            <div>
              <h1 className="p-3 text-3xl font-bold md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl text-quaternary-100">
                MusCo
              </h1>
              <p className="p-3 text-sm font-bold text-justify md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-quinary-100">
                I am also known as Mustafa COSKUNCELEBI, a dedicated full-stack
                developer with a strong specialization in the MERN stack. With a
                background in Management Information Systems, I bring a
                disciplined and organized approach to my work. My expertise in
                JavaScript, React.js, Node.js, and responsive web design
                showcases my commitment to best practices and efficient code. My
                ability to create maintainable, cross-browser compatible layouts
                highlights my proficiency in front-end and back-end development.
              </p>

              <p className="p-3 text-sm font-bold text-justify md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-quinary-100">
                Transitioning from a strategic role in the military to the
                dynamic field of web development, I leverage my experience to
                excel in IT projects. My focus on continuous learning and
                innovation drives me to stay updated with the latest industry
                trends. I am passionate about sharing my knowledge and insights,
                making me a valuable asset in the tech community. Whether
                working on complex IT projects or developing user-friendly web
                applications, I consistently deliver high-quality results that
                exceed expectations.
              </p>

              <p className="hidden p-3 text-sm font-bold text-justify lg:block xl:block xl2:block md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-quinary-100">
                In addition to my technical expertise, I excel in project
                management and strategic planning. My background in the military
                has equipped me with unparalleled discipline and a structured
                approach to problem-solving. This unique combination of skills
                allows me to handle multiple projects efficiently while
                maintaining high standards of quality.
              </p>

              <p className="hidden p-3 text-sm font-bold text-justify lg:block xl:block xl2:block md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-quinary-100">
                My dedication to continuous improvement is evident in my
                proactive approach to learning new technologies and
                methodologies. I frequently engage with the developer community,
                contributing to open-source projects and participating in tech
                forums. My passion for technology and drive for excellence make
                me a standout professional in the field of web development.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section-B">
        <div className="flex flex-col items-center justify-center h-full p-5 overflow-auto bg-mc-blue">
          <h1 className="text-xl font-bold text-primary-100">
            Here are some of the technologies I work with:
          </h1>
          <ul className="flex flex-wrap gap-3 font-semibold text-md">
            {skills.map((skill, index) => (
              <li
                key={index}
                className="p-2 rounded-lg outline bg-quinary-100 text-secondary-700"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;
