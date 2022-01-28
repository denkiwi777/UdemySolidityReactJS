import {
  Navbar,
  Footer,
  Hero,
  Breadcrumbs,
  EthInfo,
  UserWallet,
} from "@components/common";
import { CourseList } from "@components/course";
import { OrderCard } from "@components/order";
export default function Home() {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <Navbar />
          <div className="fit">
            <Hero />

            <Breadcrumbs />

            <UserWallet />

            <EthInfo />
            <OrderCard/>

            <CourseList/>
            

            
            {/*------ COURSE CARD ENDS ------*/}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
