import React, { useState } from "react";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// add icons
import Leaflet from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
// import icon from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";




// App Component.
function Spot() {
    // 接続する初期urlの設定
    const url = 'http://localhost:8080/api/spot';
    // 初期メッセージの追加
    const [msg, setMsg] = React.useState('Welcome to spot app.');
    // 観光名フィールド
    const [spotName, setSpotName] = React.useState("");
    // 所在地フィールド
    const [spotAddress, setSpotAddress] = React.useState("");
    // 説明フィールド
    const [spotExplanation, setSpotExplanation] = React.useState("");
    // 全てをまとめたやつ
    const [alldata, setAlldata] = React.useState([]);

    const [lat] = useState(36.575);
    const [lng] = useState(135.984);
    const [zoom] = useState(6);
    const [position, setPosition] = useState({
        lat: lat,
        lng: lng,
    });

    // marker setting
    let DefaultIcon = Leaflet.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    });
    Leaflet.Marker.prototype.options.icon = DefaultIcon;

    // データ一覧の更新
    React.useEffect(() => {
        // データの一覧を取得する
        fetch(url)
            // json形式に変換
            .then(res => res.json())
            .then(res => {
                // 全データ取得用のコンポーネントに入れる
                setAlldata(res);
            });
    }, [msg]);

    // 観光地フィールドの入力
    const doChange1 = (e) => {
        setSpotName(e.target.value);
    }
    // 観光地所在地フィールドの入力
    const doChange2 = (e) => {
        setSpotAddress(e.target.value);
    }

    // 観光地説明テキストエリアの入力
    const doChange3 = (e) => {
        setSpotExplanation(e.target.value);
    }

    // フォームの内容を投稿する
    const doPost = () => {
        fetch("http://localhost:8080/api/spot/add", {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                spotName: spotName,
                spotExplanation: spotExplanation,
                spotAddress: spotAddress,
            })
        })
            .then(res => res.text())
            .then(res => {
                setMsg('message posted! (id=' + res + ')');
                // ここで皆初期化する
                setSpotName("");
                setSpotAddress("");
                setSpotExplanation("");
            });
    }

    const fetchSpotData = () => {
        fetch('http://localhost:8080/api/spot')
            .then(response => response.json())
            .then(data => {
                setAlldata(data);
            })
            .catch(error => {
                console.error('Error fetching spot data:', error);
                setAlldata([]);
            });
    }

    const Delete = (event) => {
        let id = event.target.value;

        fetch("http://localhost:8080/api/spot/" + id).then(response => {
            response.json().then(value => {
                console.log(value);
                const newStock = {
                    spotId: value.spotId,
                    spotName: value.spotName,
                    spotExplanation: value.spotExplanation,
                    spotAddress: value.spotAddress
                };
                deleteStock(newStock);
            })
        })
            .catch(error => {
                console.log(error);
                setAlldata([]);
            });
    }

    const deleteStock = (formData) => {
        fetch('http://localhost:8080/api/spot/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    return fetchSpotData();
                } else {
                    console.error('Filed to delete stock');
                }
            })
            .catch(error => {
                console.error('Error deleting stock:', error);
            });
    }

    // const display = () => {
    //     // dbの住所を取得し配列にまとめる
    //     const address = alldata.map(obj => obj.spotName);
    //     console.log("address" + address);

    //     // const convertAddress = address.map((name) => {
    //     //     fetch("https://nominatim.openstreetmap.org/search?format=json&q=" + name).then(response => {
    //     //         response.json().then(value => {
    //     //             console.log(value[0].lat);
    //     //             setPosition(value[0].lat, value[0].lon)
    //     //         })
    //     //     })

    //     // })
    //     // console.log(convertAddress.lat);


    // }


    return (
        <div>
            <h1 className="bg-secondary text-light p-2">Spot app</h1>
            <p className="h5">{msg}</p>
            <button className="btn btn-secondary" type='submit'>マップに表示する</button>
            <MapContainer center={position} zoom={zoom} style={{ height: "70vh" }}>
                <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright";>OpenStreetMap</a> contributors Tiles: <a href="http://map.hotosm.org/"' url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

                <Marker position={[36.23863525, 137.9688708786901]}>
                    <Popup>
                        <h4>松本城</h4>
                        <p>国宝と呼ばれる日本が誇れる世界遺産です。</p>
                    </Popup>
                </Marker>
                <Marker position={[34.839331349999995, 134.69402000000002]}>
                    <Popup>
                        <h4>姫路城</h4>
                        <p>姫路城も世界遺産に登録されたお城です。</p>
                    </Popup>
                </Marker>
                <Marker position={[35.71005425, 139.81071409992649]}>
                    <Popup>
                        <h4>東京スカイツリー</h4>
                        <p>日本を代表する建築物の1つとして国内のみならず世界的に有名です。</p>
                    </Popup>
                </Marker>
                <Marker position={[34.967519249999995, 135.77971008109822]}>
                    <Popup>
                        <h4>伏見稲荷大社</h4>
                        <p>1300年以上の歴史を持つ神社です。 稲荷山の麓に本殿があり、稲荷山全体が神域とされています。</p>
                    </Popup>
                </Marker>
                <Marker position={[35.636321699999996, 139.77490736053358]}>
                    <Popup>
                        <h4>レインボーブリッジ</h4>
                        <p>臨海副都心と都心とを結ぶ上下二層のつり橋で、上階は首都高速道路、下階は新交通システム「ゆりかもめ」、一般道、遊歩道が通ります。 全長は約800メートルあります。</p>
                    </Popup>
                </Marker>
                <Marker position={[35.090970049999996, 136.87803347297415]}>
                    <Popup>
                        <h4>名古屋港水族館</h4>
                        <p>名古屋港水族館は、名古屋港ガーデンふ頭にある人気の施設。</p>
                    </Popup>
                </Marker>
            </MapContainer>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>ADDRESS</th>
                            <th>EXPLANATION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alldata.map((value, ky) => (
                            <tr key={ky}>
                                <td>{value.spotId}</td>
                                <td>{value.spotName}</td>
                                <td>{value.spotAddress}</td>
                                <td><div>{value.spotExplanation}</div></td>
                                <td><button className="btn btn-secondary" type='submit' name='id' value={value.spotId} onClick={Delete}>削除</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <input type="text" className="form-control mb-2" required placeholder="SpotName"
                        onChange={doChange1} value={spotName} />
                </div>
                <div>
                    <input className="form-control mb-2" required placeholder="SpotAddress"
                        onChange={doChange2} value={spotAddress}></input>
                </div>
                <div>
                    <textarea className="form-control mb-2" required placeholder="SpotExplanation"
                        onChange={doChange3} value={spotExplanation}></textarea>
                </div>
                <button className="btn btn-secondary" onClick={doPost}>Regist</button>
                <hr />
                <p className="text-center border-top border-secondary h6 my-4">copyright Tuyano 2021.</p>
            </div>
        </div>
    );
}

export default Spot;