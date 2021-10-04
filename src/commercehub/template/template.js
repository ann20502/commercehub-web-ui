import { styled } from "@mui/system";
import TemplateHeader from "./template-header";
import TemplateMenu from "./template-menu";

const Wrapper = styled('div')({});

const ContentWrapper = styled('div')({
    padding: '1.5rem 6%'
});

const Template = (props) => {

    return <Wrapper>
        <TemplateHeader name={props.headerName}></TemplateHeader>
        <ContentWrapper>{props.children}</ContentWrapper>
        <TemplateMenu/>
    </Wrapper>;

};

export default Template;