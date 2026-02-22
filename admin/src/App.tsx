import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";
import "@refinedev/antd/dist/reset.css";

// Import resource components
import { RoomList, RoomEdit, RoomCreate, RoomShow } from "./pages/rooms";
import { AmenityList, AmenityEdit, AmenityCreate } from "./pages/amenities";
import { ExperienceList, ExperienceEdit, ExperienceCreate } from "./pages/experiences";
import { TestimonialList, TestimonialEdit, TestimonialCreate } from "./pages/testimonials";
import { GalleryList, GalleryEdit, GalleryCreate } from "./pages/gallery";
import { PageContentList, PageContentEdit } from "./pages/page-content";
import { TextList, TextEdit, TextCreate } from "./pages/texts";
import { SectionList, SectionEdit } from "./pages/sections";
import { ContactMessageList, ContactMessageShow } from "./pages/contact-messages";
import { NewsletterList } from "./pages/newsletter";
import { HotelSettingsEdit } from "./pages/hotel-settings";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#C9A96E", // Gold
              colorLink: "#C9A96E",
              colorLinkHover: "#E8D5A3",
            },
          }}
        >
          <AntdApp>
            <Refine
              dataProvider={dataProvider}
              authProvider={authProvider}
              routerProvider={routerBindings}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "hotel_settings",
                  list: "/hotel-settings",
                  edit: "/hotel-settings/edit/:id",
                  meta: {
                    label: "Hotel Settings",
                    icon: "🏨",
                  },
                },
                {
                  name: "rooms",
                  list: "/rooms",
                  create: "/rooms/create",
                  edit: "/rooms/edit/:id",
                  show: "/rooms/show/:id",
                  meta: {
                    label: "Rooms",
                    icon: "🛏️",
                  },
                },
                {
                  name: "amenities",
                  list: "/amenities",
                  create: "/amenities/create",
                  edit: "/amenities/edit/:id",
                  meta: {
                    label: "Amenities",
                    icon: "✨",
                  },
                },
                {
                  name: "experiences",
                  list: "/experiences",
                  create: "/experiences/create",
                  edit: "/experiences/edit/:id",
                  meta: {
                    label: "Experiences",
                    icon: "🎯",
                  },
                },
                {
                  name: "testimonials",
                  list: "/testimonials",
                  create: "/testimonials/create",
                  edit: "/testimonials/edit/:id",
                  meta: {
                    label: "Testimonials",
                    icon: "💬",
                  },
                },
                {
                  name: "gallery_images",
                  list: "/gallery",
                  create: "/gallery/create",
                  edit: "/gallery/edit/:id",
                  meta: {
                    label: "Gallery",
                    icon: "🖼️",
                  },
                },
                {
                  name: "page_content",
                  list: "/page-content",
                  edit: "/page-content/edit/:id",
                  meta: {
                    label: "Page Content",
                    icon: "📄",
                  },
                },
                {
                  name: "texts",
                  list: "/texts",
                  create: "/texts/create",
                  edit: "/texts/edit/:id",
                  meta: {
                    label: "Editable Texts",
                    icon: "📝",
                  },
                },
                {
                  name: "sections",
                  list: "/sections",
                  edit: "/sections/edit/:id",
                  meta: {
                    label: "Sections",
                    icon: "📋",
                  },
                },
                {
                  name: "contact_messages",
                  list: "/contact-messages",
                  show: "/contact-messages/show/:id",
                  meta: {
                    label: "Contact Messages",
                    icon: "✉️",
                  },
                },
                {
                  name: "newsletter_subscribers",
                  list: "/newsletter",
                  meta: {
                    label: "Newsletter",
                    icon: "📧",
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "seagonia-cms",
              }}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2
                      Sider={() => (
                        <ThemedSiderV2
                          Title={({ collapsed }) => (
                            <div
                              style={{
                                padding: collapsed ? "8px" : "16px",
                                textAlign: "center",
                                fontSize: collapsed ? "14px" : "18px",
                                fontWeight: "bold",
                                color: "#C9A96E",
                              }}
                            >
                              {collapsed ? "S" : "Seagonia CMS"}
                            </div>
                          )}
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route index element={<NavigateToResource resource="rooms" />} />

                  <Route path="/hotel-settings">
                    <Route index element={<NavigateToResource resource="hotel_settings" />} />
                    <Route path="edit/:id" element={<HotelSettingsEdit />} />
                  </Route>

                  <Route path="/rooms">
                    <Route index element={<RoomList />} />
                    <Route path="create" element={<RoomCreate />} />
                    <Route path="edit/:id" element={<RoomEdit />} />
                    <Route path="show/:id" element={<RoomShow />} />
                  </Route>

                  <Route path="/amenities">
                    <Route index element={<AmenityList />} />
                    <Route path="create" element={<AmenityCreate />} />
                    <Route path="edit/:id" element={<AmenityEdit />} />
                  </Route>

                  <Route path="/experiences">
                    <Route index element={<ExperienceList />} />
                    <Route path="create" element={<ExperienceCreate />} />
                    <Route path="edit/:id" element={<ExperienceEdit />} />
                  </Route>

                  <Route path="/testimonials">
                    <Route index element={<TestimonialList />} />
                    <Route path="create" element={<TestimonialCreate />} />
                    <Route path="edit/:id" element={<TestimonialEdit />} />
                  </Route>

                  <Route path="/gallery">
                    <Route index element={<GalleryList />} />
                    <Route path="create" element={<GalleryCreate />} />
                    <Route path="edit/:id" element={<GalleryEdit />} />
                  </Route>

                  <Route path="/page-content">
                    <Route index element={<PageContentList />} />
                    <Route path="edit/:id" element={<PageContentEdit />} />
                  </Route>

                  <Route path="/texts">
                    <Route index element={<TextList />} />
                    <Route path="create" element={<TextCreate />} />
                    <Route path="edit/:id" element={<TextEdit />} />
                  </Route>

                  <Route path="/sections">
                    <Route index element={<SectionList />} />
                    <Route path="edit/:id" element={<SectionEdit />} />
                  </Route>

                  <Route path="/contact-messages">
                    <Route index element={<ContactMessageList />} />
                    <Route path="show/:id" element={<ContactMessageShow />} />
                  </Route>

                  <Route path="/newsletter">
                    <Route index element={<NewsletterList />} />
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route
                  element={
                    <CatchAllNavigate to="/login" />
                  }
                >
                  <Route
                    path="/login"
                    element={
                      <AuthPage
                        type="login"
                        title="Seagonia Hotel CMS"
                        formProps={{
                          initialValues: {
                            email: "",
                            password: "",
                          },
                        }}
                      />
                    }
                  />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ConfigProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
