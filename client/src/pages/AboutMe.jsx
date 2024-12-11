import React from "react";
import { PinContainer } from "../ui/pin3d";
import XIcon from "../assets/XIcon.jpg";
import githubIcon from "../assets/githubIcon.png";
import linkedinLink from "../assets/linkedinIcon.png";

const AboutMe = () => {
  // TODO: put your linkedin, github , x. Make intersenting by aceternity
  return (

    <div className="flex items-center justify-center ">
      <div className="h-[40rem] w-full flex items-center justify-center ">
        <PinContainer
          title="@RakeshKumawattt"
          href="https://x.com/RakeshKumawattt"
        >
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
              X
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-slate-500 ">Follow me on X.</span>
            </div>

            <div className="flex items-center justify-center flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500">
              <img src={XIcon} alt="XIcon" className="h-[6.5rem]" />
            </div>
          </div>
        </PinContainer>

        <PinContainer
          title="@rakeshkumawat12"
          href="https://github.com/rakeshkumawat12"
        >
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
              Github
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-slate-500 ">Follow me on Github.</span>
            </div>

            <div className="flex items-center justify-center  flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500">
              <img src={githubIcon} alt="GithubLink" />
            </div>
          </div>
        </PinContainer>

        <PinContainer
          title="@kumawatrakesh"
          href="https://www.linkedin.com/in/kumawatrakesh/"
        >
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Linkedin
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-slate-500 ">Follow me on Linkedin.</span>
            </div>

            <div className="flex items-center justify-center flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500">
              <img src={linkedinLink} alt="LinkedinIcon" />
            </div>
          </div>
        </PinContainer>
      </div>
    </div>

  );
};

export default AboutMe;
