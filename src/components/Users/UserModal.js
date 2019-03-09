import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

const UserModal = ({ 
  visible, hideModal,
  onSubmit, form, record, modalType
 }) => {

  const { getFieldDecorator, validateFields } = form;
  const { name = "", address = "", 
    age = "", id = "" } = record;

  let title = "编辑";
  switch(modalType) {
    case "edit":
      title = "编辑";
      break;
    case "add":
      title = "添加";
      break;
  }


  const hideModalHandler = () => {
    hideModal();
  }

  const submitHandler = () => {
    validateFields((err, values) => {
      if (!err) {
        let { age } = values;
        age = parseInt(age);
        values = {...values, id, age};
        onSubmit(values, modalType);
        hideModalHandler();
      }
    })
  }

  const ageValidator = (rule, value, callback) => {
    if (value && !/^[0-9]+$/g.test(value) ) {
      callback("请输入数字");
    } else {
      callback();
    }
  }

  return (
    <Modal
      title={`${title}用户资料`}
      visible={visible}
      onOk={submitHandler}
      onCancel={hideModalHandler}
      okText="提交"
      cancelText="取消"
      destroyOnClose={true}
    >
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [{
              required: true,
              type: "string",
              message: "请输入姓名"
            }],
          })(<Input/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="年龄">
          {getFieldDecorator('age', {
            initialValue: age,
            rules: [{
              required: true,
              message: "请输入年龄"
            }, {
              validator: ageValidator
            }],
          })(<Input/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="住址">
          {getFieldDecorator('address', {
            initialValue: address,
            rules: [{
              required: true,
              type: "string",
              message: "请输入住址"
            }],
          })(<Input/>)}
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(UserModal);