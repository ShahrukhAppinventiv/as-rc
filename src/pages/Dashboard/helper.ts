import useBreadcrumbs from "../../components/breadcrumbs/helper";

const useDashboard = () => {
  const breadcrumbs = useBreadcrumbs("DASHBOARD");
  return {
    breadcrumbs,
  };
};
export default useDashboard;
