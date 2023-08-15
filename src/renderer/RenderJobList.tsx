import {Renderer} from 'amis';
import {RendererProps} from 'amis';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, ListGroup, Pagination} from "amis-ui";
import dayjs from 'dayjs';
import SearchBar from "../component/SearchBar";


interface Job {
    name: string;
    minimumwage: string;
    Maximumsalary: string;
    locationtestChineseName: string;
    createdTime: string;
}


interface RenderJobListProps extends RendererProps {
  jobs: Job[];
  itemsPerPage: number;
  searchBoxKeys?: string;
  showBoxKeys?: string;
    switchSearch?: boolean;
}

const RenderJobList: React.FC<RenderJobListProps> = (
    {
       itemsPerPage = 8,
       className,
        env,
        ...args
    }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeys, setSearchKeys] = useState({});
    const [jobs, setJobs] = useState<Job[]>([]);
    const [total, setTotal] = useState(0);
    console.log('args>',args, env);

    const fetcher = env.fetcher;
    const searchBoxKeys = args.searchBoxKeys||'';
    const showBoxKeys = args.showBoxKeys||'';
    const switchSearch = args.switchSearch;


    console.log(showBoxKeys,searchBoxKeys,switchSearch);


    const fetchJobs = useCallback(()=>{
        return fetcher('/api/v1/pc/job/getAllList',
            {tenantId:9852130, searchKeys, pageNum: currentPage, pageSize: itemsPerPage},
            {
                method: 'post',
                headers: {
                    apikey:'jBYl6ffn1x2WoeCm3ICq65bNIrIoOJzy'
                }
            })
    },[currentPage, itemsPerPage, searchKeys])

    useEffect(() => {
        console.log(fetchJobs());
        fetchJobs().then((res) => {
            console.log('res>>>>>>>>',res.data);
            setTotal(res.data.total);
            setJobs(res.data.dataList);
        })
    },[currentPage, searchKeys])

    // 根据当前页和每页项数计算分页范围
    const hasKey = (key: string, searchList: string) =>{
        // !searchList ||
        return searchList.split(',').indexOf(key) > -1
    }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
      <div className={className}>
        <div className="mx-auto p-4">
          <h1 className="text-2xl mb-4">职位列表</h1>
            {switchSearch && <div>
                <SearchBar
                    show={false}
                    data={searchKeys}
                    searchBoxKeys={searchBoxKeys}
                    hasKey={hasKey}
                    onSubmit={(val) => {
                        console.log(val);
                        setSearchKeys(val);
                    }}
                />
            </div>}
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4 md:grid-cols-1 sm:grid-cols-1">
            {jobs.map((job, index) => (
                <div key={index} className="border p-4 rounded-md shadow-md space-y-4">
                    {hasKey('A', showBoxKeys) && <h2 className="text-xl font-semibold">{job.name}</h2>}
                    {hasKey('B', showBoxKeys) && <p>薪资: {job.minimumwage}_{job.Maximumsalary}{}</p>}
                    {hasKey('C', showBoxKeys) && <p>工作地址: {job.locationtestChineseName}</p>}
                    {hasKey('D', showBoxKeys) && <p>发布时间: {dayjs(job.createdTime).format('YYYY-MM-DD')}</p>}
                </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
              <Pagination perPage={itemsPerPage} total={total} activePage={currentPage} onPageChange={handlePageChange}/>
          </div>
        </div>
      </div>
  );
};

export default Renderer({
  type: 'render-joblist',
  name: 'render-joblist',
  autoVar: true
})(RenderJobList)
