import {Renderer} from 'amis';
import {RendererProps} from 'amis';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { autoConvertPX } from '../component/utils'


// interface Job {
//     id: string,
//     name: string;
//     minimumwage: string;
//     Maximumsalary: string;
//     locationtestChineseName: string;
//     ReleaseDate: string;
// }
interface RenderMapProps extends RendererProps {
  // jobs: Job[];
  width?: string;
  height?: string;
  location?: string;
}
declare const window: any;
interface MapLogicProps {
  // jobs: Job[];
  width?: string;
  height?: string;
  location?: string;
  env: any;
}

const MapLogic: React.FC<MapLogicProps> = ({
                                  width = '100%',
                                  height = '500px',
                                  location = '',
                                  env,
                                  ...args
                                }) => {
  const [centerLocation, setCenterLocation] = useState({
    lng: 116.404,
    lat: 39.928
  });
  const mapObj = useRef();

  console.log('args>>>>',args, location);

  const fetcher = env.fetcher;

  const urlParams = new URLSearchParams(window.location.search);
  const tenantId = urlParams.get('tid')||localStorage.getItem('tenantId')||'';

  // const fetchJobs = useCallback(()=>{
  //   return fetcher('/open/api/map/baidu/geocoding?location='+ encodeURIComponent(location) ,{},
  //     {
  //             method: 'get',
  //             headers: {
  //                 apikey:'jBYl6ffn1x2WoeCm3ICq65bNIrIoOJzy'
  //             }
  //         })
  // },[location])

  const getLocation = async () => {
    const res = await axios(`/open/api/map/baidu/geocoding?location=${encodeURIComponent(location)}&coordType=bd09ll`,
      {
        method: 'get',
        headers: {
          apikey:'jBYl6ffn1x2WoeCm3ICq65bNIrIoOJzy'
        }
      });
    console.log('res',res.data);
    if(res.data?.status===0){
      console.log(res.data.result);
      const centerLocation = res.data?.result?.location;
      centerLocation && setCenterLocation(centerLocation);
      addMarker(mapObj.current, centerLocation);
    }
  };

  const addMarker = (map:any, centerLocation: any) => {
    map.centerAndZoom(new window.BMapGL.Point(centerLocation.lng, centerLocation.lat), 16);
    map.enableScrollWheelZoom(true);
    map.clearOverlays();
    // 创建点标记
    const marker1 = new window.BMapGL.Marker(new window.BMapGL.Point(centerLocation.lng, centerLocation.lat));
    // const marker2 = new window.BMapGL.Marker(new window.BMapGL.Point(116.404, 39.915));
    // 在地图上添加点标记
    map.addOverlay(marker1);
    // map.addOverlay(marker2);
  }


  // useEffect(() => {
  //   console.log(1);
  //   getLocation();
  //   }, [location]
  // );

  useEffect(() => {
    console.log('xxxxxxxx',window.BMapGL);
    if(!window.BMapGL) return;
    mapObj.current = new window.BMapGL.Map('container');
    const map = mapObj.current || new window.BMapGL.Map('container');
    if(location) {
      getLocation();
    }else {
      addMarker(map, centerLocation);
    }
  }, [location]);

  return (
    <>
      <div id="container" style={{ width: autoConvertPX(width), height: autoConvertPX(height) }}></div>
    </>
  )

};

const RenderMap: React.FC<RenderMapProps> = (
    {
       width = '100%',
       height = '500px',
       location = '',
        env,
        ...args
    }) => {

    return (
      <MapLogic width={width} height={height} location={location} env={env} {...args} />
    )

    /*const [centerLocation, setCenterLocation] = useState({
        lng: 116.404,
        lat: 39.928
    });
    const mapObj = useRef();

    console.log('args>>>>',args, location);

    const fetcher = env.fetcher;

    const urlParams = new URLSearchParams(window.location.search);
    const tenantId = urlParams.get('tid')||localStorage.getItem('tenantId')||'';

    // const fetchJobs = useCallback(()=>{
    //   return fetcher('/open/api/map/baidu/geocoding?location='+ encodeURIComponent(location) ,{},
    //     {
    //             method: 'get',
    //             headers: {
    //                 apikey:'jBYl6ffn1x2WoeCm3ICq65bNIrIoOJzy'
    //             }
    //         })
    // },[location])

  const getLocation = async () => {
    const res = await axios(`/open/api/map/baidu/geocoding?location=${encodeURIComponent(location)}&coordType=bd09ll`,
      {
        method: 'get',
        headers: {
          apikey:'jBYl6ffn1x2WoeCm3ICq65bNIrIoOJzy'
        }
      });
    console.log('res',res.data);
    if(res.data?.status===0){
      console.log(res.data.result);
      const centerLocation = res.data?.result?.location;
      centerLocation && setCenterLocation(centerLocation);
      addMarker(mapObj.current, centerLocation);
    }
  };

  const addMarker = (map:any, centerLocation: any) => {
    map.centerAndZoom(new window.BMapGL.Point(centerLocation.lng, centerLocation.lat), 16);
    map.enableScrollWheelZoom(true);
    map.clearOverlays();
    // 创建点标记
    const marker1 = new window.BMapGL.Marker(new window.BMapGL.Point(centerLocation.lng, centerLocation.lat));
    // const marker2 = new window.BMapGL.Marker(new window.BMapGL.Point(116.404, 39.915));
    // 在地图上添加点标记
    map.addOverlay(marker1);
    // map.addOverlay(marker2);
  }


  // useEffect(() => {
  //   console.log(1);
  //   getLocation();
  //   }, [location]
  // );

  useEffect(() => {
    console.log('xxxxxxxx',window.BMapGL);
    mapObj.current = new window.BMapGL.Map('container');
    const map = mapObj.current || new window.BMapGL.Map('container');
    if(location) {
      getLocation();
    }else {
      addMarker(map, centerLocation);
    }
  }, [location]);

  return (
    <>
      <div id="container" style={{ width: autoConvertPX(width), height: autoConvertPX(height) }}></div>
    </>
  )
*/
};

export { MapLogic };
export default Renderer({
  type: 'render-map',
  name: 'render-map',
  autoVar: true
})(RenderMap)
