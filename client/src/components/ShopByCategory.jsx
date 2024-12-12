import { Link } from "react-router-dom";
import hm_sbc_1 from "../assets/hm_sbc_1.jpg";
import hm_sbc_2 from "../assets/hm_sbc_2.jpg";
import hm_sbc_3 from "../assets/hm_sbc_3.jpg";
import hm_sbc_4 from "../assets/hm_sbc_4.jpg";
import hm_sbc_5 from "../assets/hm_sbc_5.jpg";

const ShopByCategory = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-2xl font-bold text-gray-900 ">Shop By Category</div>
      <div className="flex flex-wrap gap-2 mt-6">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
          <a href="/productlist/67503afb6ace9dcca0df40e4">
            <img className="rounded-t-lg" src={hm_sbc_1} alt="" />
          </a>
          <div className="p-4">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
              Mangalsutras
            </h5>
            <Link to="/productlist/67503afb6ace9dcca0df40e4">
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Explore
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-arrow-up-right"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
          <a href="/productlist/67503b1a6ace9dcca0df40e6">
            <img className="rounded-t-lg" src={hm_sbc_2} alt="" />
          </a>
          <div className="p-4">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
              Chains
            </h5>
            <Link to="/productlist/67503b1a6ace9dcca0df40e6">
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Explore
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-arrow-up-right"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
          <a href="/productlist/67503b2e6ace9dcca0df40e8">
            <img className="rounded-t-lg" src={hm_sbc_3} alt="" />
          </a>
          <div className="p-4">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
              Pendants
            </h5>
            <Link to="/productlist/67503b2e6ace9dcca0df40e8">
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Explore
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-arrow-up-right"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
          <a href="/productlist/67503b3d6ace9dcca0df40ea">
            <img className="rounded-t-lg" src={hm_sbc_4} alt="" />
          </a>
          <div className="p-4">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
              Necklaces
            </h5>
            <Link to="/productlist/67503b3d6ace9dcca0df40ea">
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Explore
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-arrow-up-right"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
          <a href="/productlist/67503b546ace9dcca0df40ec">
            <img className="rounded-t-lg" src={hm_sbc_5} alt="" />
          </a>
          <div className="p-4">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
              Necklace Set
            </h5>
            <Link to="/productlist/67503b546ace9dcca0df40ec">
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Explore
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-arrow-up-right"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
