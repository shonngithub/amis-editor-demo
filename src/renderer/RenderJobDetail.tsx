import {Renderer} from 'amis';
import {RendererProps} from 'amis';
import React, {useCallback, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import './RenderJobDetail.scss';
import {Button} from "amis-ui";



interface Job {
    id: string,
    name: string;
    minimumwage: string;
    Maximumsalary: string;
    addressChineseName: string;
    ReleaseDate: string;
    JobRequirements:  string ;
    JobResponsibilities: string;
    // dangerouslySetInnerHTML
}


interface RenderJobDetailProps extends RendererProps {
  postLink?: string
}

const RenderJobDetail: React.FC<RenderJobDetailProps> = (
    {
       itemsPerPage = 8,
       className,
        env,
        ...args
    }) => {
    const [jobs, setJobs] = useState<Job>();
    console.log('args>',args, env);

    const fetcher = env.fetcher;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const tenantId = urlParams.get('tenantId');
    const postLink = args.postLink||'';

    console.log('postLink>>>',id,tenantId,postLink);


    const fetchJobsDetail = useCallback(()=>{
        return fetcher(`/api/v1/interview/getReleaseDetailPositions?positionId=${id}&tenantId=${tenantId}`,
            '',
            {
                method: 'get',
                headers: {
                    apikey:'jBYl6ffn1x2WoeCm3ICq65bNIrIoOJzy',
                    'x-app-code': 'RECRUITMENT'
                }
            })
    },[tenantId, id])

    useEffect(() => {
        fetchJobsDetail().then((res) => {
            console.log('res>>>>>>>>',res.data);
            setJobs(res.data[0]||{});
        })
    },[])






  return (
      <div className="jobDetail">
        <div className="container mx-auto md:ml-4 md:mr-4">
          <h1 className="text-title mb-5">{jobs?.name}</h1>
            <div className="dec">
                <div className="flex flex-row space-x-1">
                    <span>薪资:</span>
                    <span>{jobs?.minimumwage}-{jobs?.Maximumsalary}</span>
                </div>
                <div className="flex flex-row sm:flex-col space-x-1">
                    <span className="">工作地址:</span>
                    <span>{jobs?.addressChineseName}</span>
                </div>
                <div className="flex flex-row space-x-1">
                    <span className="">发布时间:</span>
                    <span>{jobs?.ReleaseDate?dayjs(jobs.ReleaseDate).format('YYYY-MM-DD'):''}</span>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="tit-require">
                    <span className="id_Text-15">职位要求</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html:jobs?.JobRequirements||''}} className="line-height"></div>
            </div>
            <div className="flex flex-col">
                <div className="tit-require">
                    <span className="id_Text-15">工作职责</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html:jobs?.JobResponsibilities||''}} className="line-height"></div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 pb-4 flex justify-center">
                <Button actionType="actionType" level="primary" size="lg" onClick={() => {
                    if(postLink){
                        // https://aitx.knxgalaxy.com/springboard/
                        window.open(`${postLink}?jobId=${id}&tenantId=${tenantId}&list=&referrer=&channel=&userCode=&userName=&type=&deptName=&RefereePhone=`, '_blank')
                    }
                }}>我要投递</Button>
            </div>
        </div>
      </div>
  );
};

export default Renderer({
  type: 'render-jobdetail',
  name: 'render-jobdetail',
  autoVar: true
})(RenderJobDetail)
