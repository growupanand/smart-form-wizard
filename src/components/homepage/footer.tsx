import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { brandName } from "@/lib/constants";
import { Mail } from "lucide-react";
import { montserrat } from "@/app/fonts";

export function Footer() {
  return (
    <footer className="w-full mb-2 lg:mb-5 mt-10 lg:mt-20 max-lg:px-6">
      <div className="flex flex-col lg:flex-row justify-start items-center gap-2">
        <span aria-label="App name" className={montserrat.className}>
          {brandName}
        </span>

        <Button variant="link" size="icon" className="" asChild>
          <Link
            href="https://github.com/growupanand/smart-form-wizard"
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Visit Github Repo"
          >
            <Image src="/github.svg" alt="Github logo" width={20} height={20} />
          </Link>
        </Button>
        <p className="text-md text-muted-foreground flex items-center">
          <Mail className="w-5 h-5 mr-2" /> contact@convoform.com
        </p>
        <span className="text-md lg:ml-auto">
          Created by{" "}
          <Link
            href="https://www.linkedin.com/in/utkarshanand93/"
            target="_blank"
            aria-label="Visit Utkarsh Anand's Linkedin Profile"
            rel="noopener noreferrer nofollow"
          >
            <span className="font-medium">Utkarsh Anand</span>
          </Link>
        </span>
      </div>
    </footer>
  );
}
