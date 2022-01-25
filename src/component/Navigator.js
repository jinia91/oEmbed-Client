import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Headers = () => {
  const [url, setUrl] = useState("");
  const [dataKeys, setKey] = useState([]);
  const [dataValues, setValues] = useState([]);

  const onChange = (e) => {
    setUrl(e.target.value);
  };

  const onKeyPress = (e) => {
    setUrl(e.target.value);
    getOembedUrl();
  };

  const getOembedUrl = async () => {
    try {
      console.log(url);
      const res = await axios.get("http://localhost:8080/v1/oembed", {
        params: {
          url: url,
        },
      });
      if (res && res.status === 200) {
        const { data } = res;
        setKey(Object.keys(data));
        setValues(Object.values(data));
        ResultTable();
      }
    } catch (v) {
      alert(v);
      console.log("error ", v);
    }
  };

  function ResultTable() {
    const keys = dataKeys;
    const values = dataValues;

    let lis = [];
    for (let i = 0; i < keys.length; i++) {
      if (
        keys[i] == "author_url" ||
        keys[i] == "provider_url" ||
        keys[i] == "url"
      ) {
        lis.push(
          <tr key={i}>
            <th scope="row">{keys[i]}</th>
            <td>
              <a href={values[i]}>{values[i]}</a>
            </td>
          </tr>
        );
        continue;
      }
      if (
        keys[i] == "thumbnail_url" ||
        keys[i] == "thumbnail_url_with_play_button"
      ) {
        lis.push(
          <tr key={i}>
            <th scope="row">{keys[i]}</th>
            <td>
              <a href={values[i]}>{values[i]}</a>
              <div>
                <img src={values[i]} className="img-fluid img-thumbnail" />
              </div>
            </td>
          </tr>
        );
        continue;
      }
      if (keys[i] == "html") {
        lis.push(
          <tr key={i}>
            <th scope="row">{keys[i]}</th>
            <td>
              {values[i]}
              <div
                className="ratio ratio-16x9"
                dangerouslySetInnerHTML={{ __html: values[i] }}
              ></div>
            </td>
          </tr>
        );
        continue;
      }

      lis.push(
        <tr key={i}>
          <th scope="row">{keys[i]}</th>
          <td>{values[i]}</td>
        </tr>
      );
    }
    return (
      <table className="table table-striped">
        <tbody>{lis}</tbody>
      </table>
    );
  }

  return (
    <>
      <h1 className="mt-5 mb-2">oEmbed Test</h1>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <div className="input-group mb-2">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Url을 입력해주세요"
              aria-label="Search"
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
            <button
              className="btn btn-outline-success "
              type="submit"
              onClick={getOembedUrl}
            >
              검색
            </button>
          </div>
        </div>
        <ResultTable></ResultTable>
      </nav>
    </>
  );
};
export default Headers;
