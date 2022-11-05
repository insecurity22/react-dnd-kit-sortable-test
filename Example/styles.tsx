import styled from "styled-components";

export const SortableWrap = styled.div`
  background: white;
  padding: 25px;

  .button__wrap {
    display: flex;
    justify-content: flex-end;

    button {
      width: 158px;
      height: 38px;
      font-size: 14px;
      line-height: 38px;
      margin-top: 20px;
      border: 1px solid #333;
      border-radius: 1px;
      background: #333;
      color: #fff;
      box-shadow: 0 1px 2px rgb(0 0 0 / 12%);
      box-sizing: content-box;

      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
`;

export const SortableBaseStyle = styled.div`
  padding: 10px;
  background: #f5f5f5;
  .list {
    background: white;
    padding: 0 19px;
    height: 52px;
    display: flex;
    align-items: center;
    border: 1px solid #f5f5f5;
    position: relative;

    .movebtn,
    .removebtn {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 10px;

      &:hover {
        background: #f2f2f2;
      }
    }

    .movebtn {
      margin-right: 20px;
      padding: 12px 10px;
    }

    .removebtn {
      position: absolute;
      right: 20px;
      visibility: hidden;
      padding: 14px 12px;
    }
  }
  .list:hover {
    .removebtn {
      visibility: visible;
    }
  }

  .list.add-list {
    button {
      float: left;
      min-width: 76px;
      min-height: 30px;
      line-height: 30px;
      border-radius: 1px;
      border: 1px solid #c5cdd7;
      background: #fff;
      text-align: center;
      box-shadow: 0 1px 1px rgb(0 0 0 / 8%);
      box-sizing: content-box;

      &.disabled {
        background: #fff;
        border-color: #e0e5ee;
        color: #959595;
        box-shadow: none;
        cursor: not-allowed;
      }
    }
  }
`;
