import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Card } from "@mui/material";
import useCMS from "./helper";
import Breadcrumbs from "../../components/breadcrumbs";
import TextEditor from "../../components/text-editor";
import { getCmsData, updateCMSData } from "./service/slice";
import { toast } from "react-toastify";
import CommonDialog from "../../components/dialog-box";

export default function CMS() {
    const {
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
        isEmptyHtml,
        privacyPolicyData,
        aboutUsData,
        termsConditionData,
        dispatch,
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
    } = useCMS();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue);
        if (newValue == "privacyPolicy") {
            setDialogHeading((prev) => 'Update Privacy Policy')
            setDialogText(prev => 'Are you sure you want to update privacy policy')
        } else if (newValue == "TC") {
            setDialogHeading(prev => 'Update Terms & Condition')
            setDialogText(prev => 'Are you sure you want to update terms & condition')
        } else {
            setDialogHeading(prev => 'Update About Us')
            setDialogText(prev => 'Are you sure you want to update about us')
        }
    };




    const updateHandler = async () => {
        if (selectedTab == "privacyPolicy") {
            await dispatch(updateCMSData({ privacyEn: privactyPolicy }))
            toast.success("Privacy policy has been updated successfully")
            dispatch(getCmsData("PRIVACY_POLICY"))
            console.log("Privacy policy --->", privactyPolicy);
        } else if (selectedTab == "TC") {
            console.log("TC --->", termsCondition);
            await dispatch(updateCMSData({ termsEn: termsCondition }))
            toast.success("Terms & Condition has been updated successfully")
            dispatch(getCmsData("TERMS_CONDITIONS"))
        } else {
            console.log("abouts us --->", aboutUs);
            await dispatch(updateCMSData({ aboutUsEn: aboutUs }))
            toast.success("About us has been updated successfully")
            dispatch(getCmsData("ABOUT_US"))
        }
    };

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <Card className="p-6 rounded-xl shadow-sm bg-gray-100">
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={selectedTab}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Privacy Policy" value="privacyPolicy" />
                                <Tab label="Terms & Condition" value="TC" />
                                <Tab label="About us" value="aboutUs" />
                            </TabList>
                        </Box>
                        <TabPanel value="privacyPolicy">
                            <TextEditor
                                data={privactyPolicy}
                                onChange={editorChangeHandler(
                                    setPrivacyPolicy,
                                    setIsPrivacyPolicy,
                                )}
                                onBlur={() => setIsPrivacyTouched(true)}
                            />
                            {isPrivacyTouched && isPrivacyPolicy && (
                                <p className="text-red-500 text-sm mt-1">
                                    Privacy Policy is required
                                </p>
                            )}
                            <Box
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                <Button
                                    sx={{ textTransform: "none", width: "200px" }}
                                    variant="contained"
                                    disabled={isPrivacyPolicy}
                                    onClick={() => setOpenDialog(true)}
                                >
                                    {isEmptyHtml(privacyPolicyData.privacyEn) ? 'Add' : 'Update'}
                                </Button>
                            </Box>
                        </TabPanel>
                        <TabPanel value="TC">
                            <TextEditor
                                data={termsCondition}
                                onChange={editorChangeHandler(
                                    setTermsCondition,
                                    setIsTermsCondition,
                                )}
                                onBlur={() => setIsTcTouched(true)}
                            />
                            {isTcTouched && isTermsCondition && (
                                <p className="text-red-500 text-sm mt-1">
                                    Terms & Condition is required
                                </p>
                            )}
                            <Box
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                <Button
                                    sx={{ textTransform: "none", width: "200px" }}
                                    variant="contained"
                                    disabled={isTermsCondition}
                                    onClick={() => setOpenDialog(true)}
                                >
                                    {isEmptyHtml(termsConditionData.termsEn) ? 'Add' : 'Update'}
                                </Button>
                            </Box>
                            {/* <ReactQuill
                                theme="snow"
                                value={termsCondition}
                                onChange={setTermsCondition}
                            /> */}
                        </TabPanel>
                        <TabPanel value="aboutUs">
                            <TextEditor
                                data={aboutUs}
                                onChange={editorChangeHandler(setAboutUs, setIsAbousUs)}
                                onBlur={() => setIsAboutusTouched(true)}
                            />
                            {isAboutusTouched && isAbousUs && (
                                <p className="text-red-500 text-sm mt-1">
                                    About us is required
                                </p>
                            )}
                            <Box
                                sx={{
                                    mt: 2,
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                <Button
                                    sx={{ textTransform: "none", width: "200px" }}
                                    variant="contained"
                                    disabled={isAbousUs}
                                    onClick={() => setOpenDialog(true)}
                                >
                                    {isEmptyHtml(aboutUsData.aboutUsEn) ? 'Add' : 'Update'}
                                </Button>
                            </Box>

                            {/* <ReactQuill
                                theme="snow"
                                value={aboutUs}
                                onChange={setAboutUs}
                            /> */}
                        </TabPanel>
                    </TabContext>
                </Box>
                <CommonDialog
                    open={openDialog}
                    title={dialogHeading}
                    description={dialogText}
                    onClose={() => setOpenDialog(false)}
                    onConfirm={updateHandler}
                />
            </Card>
        </>
    );
}
