import CategoryDesktop from "./CategoryDesktop";
import CategoryMobile from "./CategoryMobile";

export default function Category() {
  return (
    <>
      <div className="hidden md:block">
        <CategoryDesktop />
      </div>

      <div className="block md:hidden">
        <CategoryMobile />
      </div>
    </>
  );
}
