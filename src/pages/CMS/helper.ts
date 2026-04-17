import { useEffect, useState } from "react";
import useBreadcrumbs from "../../components/breadcrumbs/helper";
import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../store/store";
import { getCmsData, setCmsInitialState } from "./service/slice";

const useCMS = () => {
  const breadcrumbs = useBreadcrumbs("CMS");
  const [selectedTab, setSelectedTab] = useState<string>("privacyPolicy");
  const [privactyPolicy, setPrivacyPolicy] = useState("");
  const [isPrivacyPolicy, setIsPrivacyPolicy] = useState<boolean>(true);
  const [isPrivacyTouched, setIsPrivacyTouched] = useState(false);
  const [termsCondition, setTermsCondition] = useState("");
  const [isTermsCondition, setIsTermsCondition] = useState<boolean>(true);
  const [isTcTouched, setIsTcTouched] = useState(false);
  const [aboutUs, setAboutUs] = useState("");
  const [isAbousUs, setIsAbousUs] = useState<boolean>(true);
  const [isAboutusTouched, setIsAboutusTouched] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogHeading, setDialogHeading] = useState<string>(
    "Update Privacy Policy",
  );
  const [dialogText, setDialogText] = useState<string>(
    "Are you sure you want to update privacy policy",
  );

  const editorChangeHandler =
    (setData: (val: string) => void, setIsEmpty: (val: boolean) => void) =>
    (value: string, delta: any, source: any, editor: any) => {
      setData(value);

      const text = editor.getText().trim();
      setIsEmpty(text.length === 0);
    };

  // const handlePrivacyPolicyEditorChange = (
  //     value: string,
  //     delta: any,
  //     source: any,
  //     editor: any
  // ) => {
  //     setPrivacyPolicy(value);
  //     const text = editor.getText().trim();
  //     setIsPrivacyPolicy(text.length === 0);
  // };

  const privacyPolicyData: any = useAppSelector(
    (state) => state.cmsSlice.PRIVACY_POLICY,
  );
  const aboutUsData: any = useAppSelector((state) => state.cmsSlice.ABOUT_US);

  const termsConditionData: any = useAppSelector(
    (state) => state.cmsSlice.TERMS_CONDITIONS,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCmsData("PRIVACY_POLICY")).unwrap();
    dispatch(getCmsData("TERMS_CONDITIONS")).unwrap();
    dispatch(getCmsData("ABOUT_US")).unwrap();
    return () => {
      dispatch(setCmsInitialState());
    };
  }, []);
  const isEmptyHtml = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return !div.textContent?.trim();
  };

  useEffect(() => {
    if (privacyPolicyData?.privacyEn) {
      setPrivacyPolicy(privacyPolicyData.privacyEn);
      setIsPrivacyPolicy(isEmptyHtml(privacyPolicyData.privacyEn));
    }

    if (termsConditionData?.termsEn) {
      setTermsCondition(termsConditionData.termsEn);
      setIsTermsCondition(isEmptyHtml(termsConditionData.termsEn));
    }

    if (aboutUsData?.aboutUsEn) {
      setAboutUs(aboutUsData.aboutUsEn);
      setIsAbousUs(isEmptyHtml(aboutUsData.aboutUsEn));
    }
  }, [privacyPolicyData, termsConditionData, aboutUsData]);

  return {
    breadcrumbs,
    selectedTab,
    setSelectedTab,
    privactyPolicy,
    setPrivacyPolicy,
    isPrivacyPolicy,
    setIsPrivacyPolicy,
    termsCondition,
    setTermsCondition,
    isTermsCondition,
    setIsTermsCondition,
    aboutUs,
    setAboutUs,
    isAbousUs,
    setIsAbousUs,
    editorChangeHandler,
    dispatch,
    isEmptyHtml,
    privacyPolicyData,
    aboutUsData,
    termsConditionData,
    isPrivacyTouched,
    setIsPrivacyTouched,
    isTcTouched,
    setIsTcTouched,
    isAboutusTouched,
    setIsAboutusTouched,
    openDialog,
    setOpenDialog,
    dialogHeading,
    setDialogHeading,
    dialogText,
    setDialogText,
  };
};

export default useCMS;
