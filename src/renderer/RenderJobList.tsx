import {Renderer} from 'amis';
import {RendererProps} from 'amis';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, ListGroup, Pagination} from "amis-ui";
import dayjs from 'dayjs';


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
}

const RenderJobList: React.FC<RenderJobListProps> = (
    {
       itemsPerPage = 8,
       className,
        ...args
    }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [total, setTotal] = useState(0);
    console.log('args>',args);
    const fetcher = args.env.fetcher;



    const fetchJobs = useCallback(()=>{
        return fetcher('/api/v1/pc/job/getAllList',
            {tenantId:9852130, pageNum: currentPage, pageSize: itemsPerPage},
            {
                method: 'post',
                headers: {
                    apikey:'jBYl6ffn1x2WoeCm3ICq65bNIrIoOJzy'
                }
            })
    },[currentPage, itemsPerPage])

    useEffect(() => {
        console.log(fetchJobs());
        fetchJobs().then((res) => {
            console.log('res>>>>>>>>',res.data);
            setTotal(res.data.total);
            setJobs(res.data.dataList);
        })
    },[currentPage])

    // 根据当前页和每页项数计算分页范围
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  // const currentJobs = jobs.slice(startIndex, endIndex);

  // const totalPages = Math.ceil(jobs.length / itemsPerPage);
  //   console.log(totalPages);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
      <div className={className}>
        <div className="mx-auto p-4">
          <h1 className="text-2xl mb-4">职位列表</h1>
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4 md:grid-cols-1 sm:grid-cols-1">
            {jobs.map((job, index) => (
                <div key={index} className="border p-4 rounded-md shadow-md space-y-4">
                  <h2 className="text-xl font-semibold">{job.name}</h2>
                  <p>薪资: {job.minimumwage}_{job.Maximumsalary}{}</p>
                  <p>工作地址: {job.locationtestChineseName}</p>
                  <p>发布时间: {dayjs(job.createdTime).format('YYYY-MM-DD')}</p>
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
