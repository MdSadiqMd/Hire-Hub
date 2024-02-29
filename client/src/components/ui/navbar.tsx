"use client";
import React, { useState, useEffect, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

export const navigation = [
  { name: "Home", href: "/home", current: false },
  { name: "Jobs", href: "/jobs", current: false },
  { name: "Post a Job", href: "/profile/job", current: false },
  { name: "Profile", href: "/profile", current: false },
];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar: React.FC<{ search?: string }> = ({ search }) => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState<Boolean>(true);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch] = useDebounce((value: string) => {
    router.push(`/jobs?search=${value}`);
  }, 5000);
  const router = useRouter();

  useEffect(() => {
    // Update the current property in navigation based on the current route
    const updatedNavigation = navigation.map((item) => ({
      ...item,
      current: item.href === router.pathname,
    }));
    navigation.splice(0, navigation.length, ...updatedNavigation);
  }, [router.pathname]);

  const handleSearch = (e: any) => {
    if (e.key == "Enter") {
      debouncedSearch(searchText);
    } else {
      debouncedSearch(searchText);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSearchBarVisible(window.innerWidth > 786);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logout = async () => {
    try {
      await axios.get("api/auth/signout");
      toast.success("Logout Sucessful");
      router.push("/signup");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 scrollbar-hide">
        {({ open }): React.JSX.Element => (
          <>
            <div className="shadow transition hover:shadow-md z-40 rounded-2xl">
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="/logo.svg"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/*Search Bar */}
                  <div
                    className="searchBar pt-2 relative mx-auto text-gray-600"
                    style={{
                      display: isSearchBarVisible ? "block" : "none",
                    }}
                  >
                    <input
                      className="border-2 border-gray-700 bg-black text-gray-200 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                      type="search"
                      name="search"
                      placeholder="Search"
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                      onKeyPress={(e) => handleSearch(e)}
                    />
                    <button
                      type="submit"
                      className="absolute right-0 top-0 mt-5 mr-4"
                      onClick={handleSearch}
                    >
                      <svg
                        className="text-gray-600 h-4 w-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 56.966 56.966"
                        style={
                          { enableBackground: "new 0 0 56.966 56.966" } as any
                        }
                        xmlSpace="preserve"
                        width="512px"
                        height="512px"
                      >
                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                      </svg>
                    </button>
                  </div>

                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className={classNames(
                                  active ? "bg-gray-900" : "",
                                  "block px-4 py-2 text-sm text-gray-300"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className={classNames(
                                  active ? "bg-gray-900" : "",
                                  "block px-4 py-2 text-sm text-gray-300"
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-900" : "",
                                  "block px-4 py-2 text-sm text-gray-300"
                                )}
                                onClick={() => logout()}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </div>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
