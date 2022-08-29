import { Button, Card, List } from "antd";
import {StopOutlined} from "@ant-design/icons"
import PropTypes from "prop-types";
const FollowList = ({header,data}) =>{
    return (<List
        className="mb-5"
        grid={{gutter:4, xs:2, md:3}}
        header={<div>{header}</div>}
        loadMore={<div className="text-center my-3"><Button>더 보기</Button></div>}
        bordered
        dataSource={data}
        renderItem={(item)=>(
            <List.Item className="mt-10">
                <Card actions={[<StopOutlined key="stop"/>]}>
                    <Card.Meta description={item.nickname}/>
                </Card>
            </List.Item>
        )}
        ></List>)
}

FollowList.propTypes ={
    header:PropTypes.string.isRequired,
    data:PropTypes.array.isRequired,

}

export default FollowList;