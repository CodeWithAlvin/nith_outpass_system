import {cn} from "@/lib/utils"


const Container = ({ children, className="", ...props }) => {
  return (
    <div className={cn("flex justify-center items-center w-full h-full",className)} {...props} >
      {children}
    </div>
  );
};

export {Container};

